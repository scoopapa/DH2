export const Moves: {[k: string]: ModdedMoveData} = {
	spikyshield: {
		num: 596,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spiky Shield",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'spikyshield',
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
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
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
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
				if (move.flags['contact'] && target.species.name === 'Chesnaught-Steel' && target.hasAbility('battlebond')) {
					this.damage(source.baseMaxhp / 4, source, target);
				}
				else if (move.flags['contact']) {
					this.damage(source.baseMaxhp / 8, source, target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact'] && target.species.name === 'Chesnaught-Steel' && target.hasAbility('battlebond')) {
					this.damage(source.baseMaxhp / 4, source, target);
				}
				else if (move.isZOrMaxPowered && move.flags['contact']) {
					this.damage(source.baseMaxhp / 8, source, target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	mysticalfire: {
		num: 595,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Mystical Fire",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Delphox-Aria' && pokemon.hasAbility('battlebond')) {
				move.accuracy = true;
			  target.addVolatile('miracleeye');
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
};
