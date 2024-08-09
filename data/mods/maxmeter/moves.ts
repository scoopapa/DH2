export const Moves: {[k: string]: ModdedMoveData} = {
	// meter moves
	sleepysurprise: {
		num: 2000,
		accuracy: 100,
		basePower: 150,
		category: "Status",
		shortDesc: "User sleeps 2 turns and restores HP and status.",
		name: "Sleepy Surprise",
		pp: 5,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rest", source);
			this.add('-anim', source, "Misty Explosion", target);
		},
		onDisableMove(pokemon) {
			if (!pokemon.side.getSideCondition('maxmeter7')) pokemon.disableMove('sleepysurprise');
		},
		onTryHit(source) {
			source.side.removeSideCondition('maxmeter7');
		},
		onTry(source) {
			if (source.status === 'slp' || source.hasAbility('comatose')) return false;
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
			const result = source.setStatus('slp', source, move);
			if (!result) return result;
			source.statusState.time = 3;
			source.statusState.startTime = 3;
			this.heal(source.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
		secondary: null,
		target: "allAdjacent",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	karaokenight: {
		num: 2001,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Puts the foe to sleep.",
		name: "Karaoke Night",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		status: 'slp',
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sing", target);
		},
		onDisableMove(pokemon) {
			if (!pokemon.side.getSideCondition('maxmeter1') && !pokemon.side.getSideCondition('maxmeter2') && !pokemon.side.getSideCondition('maxmeter3') && !pokemon.side.getSideCondition('maxmeter4') && !pokemon.side.getSideCondition('maxmeter5') && !pokemon.side.getSideCondition('maxmeter6') && !pokemon.side.getSideCondition('maxmeter7')) pokemon.disableMove('karaokenight');
		},
		onTryHit(source) {
			if (source.side.removeSideCondition('maxmeter1')) {
				source.side.removeSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter2')) {
				source.side.removeSideCondition('maxmeter2');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter3')) {
				source.side.removeSideCondition('maxmeter3');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter4');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter6');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Cute",
	},
	deflation: {
		num: 2002,
		accuracy: 100,
		shortDesc: "If hit by an attack, returns 2x damage.",
		basePower: 0,
		damageCallback(pokemon) {
			const lastDamagedBy = pokemon.getLastDamagedBy(true);
			if (lastDamagedBy !== undefined) {
				return (lastDamagedBy.damage * 2) || 1;
			}
			return 0;
		},
		category: "Special",
		name: "Deflation",
		pp: 10,
		priority: -6,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Explosion", target);
		},
		onDisableMove(pokemon) {
			if (!pokemon.side.getSideCondition('maxmeter3') && !pokemon.side.getSideCondition('maxmeter4') && !pokemon.side.getSideCondition('maxmeter5') && !pokemon.side.getSideCondition('maxmeter6') && !pokemon.side.getSideCondition('maxmeter7')) pokemon.disableMove('deflation');
		},
		onTryHit(source) {
			if (source.side.removeSideCondition('maxmeter3')) {
				source.side.removeSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter4')) {
				source.side.removeSideCondition('maxmeter4');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
				source.side.addSideCondition('maxmeter2');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter3');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter4');
			}
		},
		onTry(source) {
			const lastDamagedBy = source.getLastDamagedBy(true);
			if (lastDamagedBy === undefined || !lastDamagedBy.thisTurn) return false;
		},
		onModifyTarget(targetRelayVar, source, target, move) {
			const lastDamagedBy = source.getLastDamagedBy(true);
			if (lastDamagedBy) {
				targetRelayVar.target = this.getAtSlot(lastDamagedBy.slot);
			}
		},
		secondary: null,
		target: "scripted",
		type: "Fairy",
		contestType: "Cool",
	},
	puffup: {
		num: 2003,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Forces the target to switch to a random ally.",
		name: "Puff Up",
		pp: 10,
		priority: -6,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pulverizing Pancake", target);
		},
		onDisableMove(pokemon) {
			if (!pokemon.side.getSideCondition('maxmeter5') && !pokemon.side.getSideCondition('maxmeter6') && !pokemon.side.getSideCondition('maxmeter7')) pokemon.disableMove('puffup');
		},
		onTryHit(source) {
			if (source.side.removeSideCondition('maxmeter5')) {
				source.side.removeSideCondition('maxmeter5');
			} else if (source.side.removeSideCondition('maxmeter6')) {
				source.side.removeSideCondition('maxmeter6');
				source.side.addSideCondition('maxmeter1');
			} else if (source.side.removeSideCondition('maxmeter7')) {
				source.side.removeSideCondition('maxmeter7');
				source.side.addSideCondition('maxmeter2');
			}
		},
		forceSwitch: true,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	
	// removing dynamax's random immunities (AKA i totally could've just used tera instead of dmax)
		destinybond: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Destiny Bond');
			},
			onFaint(target, source, effect) {
				if (!source || !effect || target.isAlly(source)) return;
				if (effect.effectType === 'Move' && !effect.flags['futuremove']) {
					this.add('-activate', target, 'move: Destiny Bond');
					source.faint();
				}
			},
			onBeforeMovePriority: -1,
			onBeforeMove(pokemon, target, move) {
				if (move.id === 'destinybond') return;
				this.debug('removing Destiny Bond before attack');
				pokemon.removeVolatile('destinybond');
			},
			onMoveAborted(pokemon, target, move) {
				pokemon.removeVolatile('destinybond');
			},
		},
	},
	encore: {
		inherit: true,
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move) return false;

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
				if (!target.moves.includes(this.effectState.move) ||
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
	entrainment: {
		inherit: true,
		onTryHit(target, source) {
			if (target === source) return false;
			if (
				target.ability === source.ability ||
				target.getAbility().flags['cantsuppress'] || target.ability === 'truant' ||
				source.getAbility().flags['noentrain']
			) {
				return false;
			}
		},
		onHit(target, source) {
			const oldAbility = target.setAbility(source.ability);
			if (oldAbility) {
				this.add('-ability', target, target.getAbility().name, '[from] move: Entrainment');
				if (!target.isAlly(source)) target.volatileStaleness = 'external';
				return;
			}
			return oldAbility as false | null;
		},
	},
	grassknot: {
		inherit: true,
		desc: "This move's power is 20 if the target weighs less than 10 kg, 40 if less than 25 kg, 60 if less than 50 kg, 80 if less than 100 kg, 100 if less than 200 kg, and 120 if greater than or equal to 200 kg or if the target is Dynamax or Gigantamax.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 120;
			} else if (targetWeight >= 2000) {
				bp = 120;
			} else if (targetWeight >= 1000) {
				bp = 100;
			} else if (targetWeight >= 500) {
				bp = 80;
			} else if (targetWeight >= 250) {
				bp = 60;
			} else if (targetWeight >= 100) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	lowkick: {
		inherit: true,
		desc: "This move's power is 20 if the target weighs less than 10 kg, 40 if less than 25 kg, 60 if less than 50 kg, 80 if less than 100 kg, 100 if less than 200 kg, and 120 if greater than or equal to 200 kg or if the target is Dynamax or Gigantamax.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 120;
			} else if (targetWeight >= 2000) {
				bp = 120;
			} else if (targetWeight >= 1000) {
				bp = 100;
			} else if (targetWeight >= 500) {
				bp = 80;
			} else if (targetWeight >= 250) {
				bp = 60;
			} else if (targetWeight >= 100) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	heatcrash: {
		inherit: true,
		desc: "The power of this move depends on (user's weight / target's weight), rounded down. Power is equal to 120 if the result is 5 or more, 100 if 4, 80 if 3, 60 if 2, and 40 if 1 or less or if the target is Dynamax or Gigantamax. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 40;
			} else if (pokemonWeight >= targetWeight * 5) {
				bp = 120;
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100;
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80;
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	heavyslam: {
		inherit: true,
		desc: "The power of this move depends on (user's weight / target's weight), rounded down. Power is equal to 120 if the result is 5 or more, 100 if 4, 80 if 3, 60 if 2, and 40 if 1 or less or if the target is Dynamax or Gigantamax. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			let bp;
			if (target.volatiles['dynamax']) {
				bp = 40;
			} else if (pokemonWeight >= targetWeight * 5) {
				bp = 120;
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100;
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80;
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		onTryHit() {},
	},
	instruct: {
		inherit: true,
		onHit(target, source) {
			if (!target.lastMove) return false;
			const lastMove = target.lastMove;
			const moveIndex = target.moves.indexOf(lastMove.id);
			if (
				lastMove.flags['failinstruct'] || lastMove.isZ || lastMove.isMax ||
				lastMove.flags['charge'] || lastMove.flags['recharge'] ||
				target.volatiles['beakblast'] || target.volatiles['focuspunch'] || target.volatiles['shelltrap'] ||
				(target.moveSlots[moveIndex] && target.moveSlots[moveIndex].pp <= 0)
			) {
				return false;
			}
			this.add('-singleturn', target, 'move: Instruct', '[of] ' + source);
			this.queue.prioritizeAction(this.queue.resolveAction({
				choice: 'move',
				pokemon: target,
				moveid: target.lastMove.id,
				targetLoc: target.lastMoveTargetLoc!,
			})[0] as MoveAction);
		},
	},
	skillswap: {
		inherit: true,
		onTryHit(target, source) {
			const targetAbility = target.getAbility();
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['failskillswap'] || targetAbility.flags['failskillswap']) {
				return false;
			}
			const sourceCanBeSet = this.runEvent('SetAbility', source, source, this.effect, targetAbility);
			if (!sourceCanBeSet) return sourceCanBeSet;
			const targetCanBeSet = this.runEvent('SetAbility', target, source, this.effect, sourceAbility);
			if (!targetCanBeSet) return targetCanBeSet;
		},
	},
	torment: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'gmaxmeltdown') this.effectState.duration = 3;
				this.add('-start', pokemon, 'Torment');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Torment');
			},
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			},
		},
	},
	
	// coding the max meter side conditions (AKA I really should've worked off of Stockpile)
	maxmeter1: {
		shortDesc: "The first level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 1",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter1',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) { // add that moves with numbers above 1999 shouldn't build meter
					source.side.removeSideCondition('maxmeter1');
					source.side.addSideCondition('maxmeter2');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 1');
				this.add('-message', `This side has 1 level of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 1');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter2: {
		shortDesc: "The second level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 2",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter2',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter2');
					source.side.addSideCondition('maxmeter3');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 2');
				this.add('-message', `This side has 2 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 2');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter3: {
		shortDesc: "The third level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 3",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter3',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter3');
					source.side.addSideCondition('maxmeter4');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 3');
				this.add('-message', `This side has 3 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 3');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter4: {
		shortDesc: "The fourth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 4",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter4',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter4');
					source.side.addSideCondition('maxmeter5');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 4');
				this.add('-message', `This side has 4 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 4');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter5: {
		shortDesc: "The fifth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 5",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter5',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter5');
					source.side.addSideCondition('maxmeter6');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 5');
				this.add('-message', `This side has 5 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 5');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter6: {
		shortDesc: "The sixth level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 6",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter6',
		condition: {
			onAfterMoveSecondarySelf(source, target, move) {
				if (!move || !target) return;
				if (source.hasType(move.type)) {
					source.side.removeSideCondition('maxmeter6');
					source.side.addSideCondition('maxmeter7');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 6');
				this.add('-message', `This side has 6 levels of Max Meter!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 6');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	maxmeter7: {
		shortDesc: "The seventh and final level of Max Meter.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Max Meter 7",
		pp: 1,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'maxmeter7',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Max Meter 7');
				this.add('-message', `This side has 7 levels of Max Meter!`);
				this.add('-message', `The Max Meter is now maxed out!`);
				if (side.sideConditions['dynamaxused']) {
					side.dynamaxUsed = true;
				} else {
					side.dynamaxUsed = false;				
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Max Meter 7');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	dynamaxused: {
		shortDesc: "Prevents Dynamax from being used multiple times.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dynamax Used",
		pp: 5,
		priority: 0,
		flags: {},
		noSketch: true,
		sideCondition: 'dynamaxused',
		condition: {},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
};
