'use strict';

/**@type {{[k: string]: ModdedMoveData}} */
const BattleMovedex = {
	bind: {
		inherit: true,
		// FIXME: onBeforeMove() {},
	},
	clamp: {
		inherit: true,
		// FIXME: onBeforeMove() {},
	},
	firespin: {
		inherit: true,
		// FIXME: onBeforeMove() {},
	},
	highjumpkick: {
		inherit: true,
		desc: "If this attack misses the target, the user takes 1 HP of damage.",
		shortDesc: "User takes 1 HP damage it would have dealt if miss.",
		onMoveFail(target, source, move) {
			if (!target.types.includes('Ghost')) {
				this.directDamage(1, source);
			}
		},
	},
	jumpkick: {
		inherit: true,
		desc: "If this attack misses the target, the user 1HP of damage.",
		shortDesc: "User takes 1 HP damage if miss.",
		onMoveFail(target, source, move) {
			this.damage(1, source);
		},
	},
	leechseed: {
		inherit: true,
		onHit() {},
		effect: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onAfterMoveSelfPriority: 1,
			onAfterMoveSelf(pokemon) {
				const leecher = pokemon.side.foe.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!leecher || leecher.fainted || leecher.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const toLeech = this.dex.clampIntRange(Math.floor(pokemon.maxhp / 16), 1);
				const damage = this.damage(toLeech, pokemon, leecher);
				if (damage) this.heal(damage, leecher, pokemon);
			},
		},
	},
	rage: {
		inherit: true,
		self: {
			volatileStatus: 'rage',
		},
		effect: {
			// Rage lock
			duration: 255,
			onStart(target, source, effect) {
				this.effectState.move = 'rage';
			},
			onLockMove: 'rage',
			onTryHit(target, source, move) {
				if (target.boosts.atk < 6 && move.id === 'disable') {
					this.boost({atk: 1});
				}
			},
			onHit(target, source, move) {
				if (target.boosts.atk < 6 && move.category !== 'Status') {
					this.boost({atk: 1});
				}
			},
		},
	},
	recover: {
		inherit: true,
		heal: null,
		onHit(target) {
			if (target.hp === target.maxhp) {
				return false;
			}
			this.heal(Math.floor(target.maxhp / 2), target, target);
		},
	},
	rest: {
		inherit: true,
		onHit(target, source, move) {
			// Fails if the difference between
			// max HP and current HP is 0, 255, or 511
			if (target.hp >= target.maxhp) return false;
			if (!target.setStatus('slp', source, move)) return false;
			target.statusData.time = 2;
			target.statusData.startTime = 2;
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
	},
	softboiled: {
		inherit: true,
		heal: null,
		onHit(target) {
			// Fail when health is 255 or 511 less than max
			if (target.hp === target.maxhp) {
				return false;
			}
			this.heal(Math.floor(target.maxhp / 2), target, target);
		},
	},
	substitute: {
		inherit: true,
		effect: {
			onStart(target) {
				this.add('-start', target, 'Substitute');
				this.effectState.hp = Math.floor(target.maxhp / 4);
				delete target.volatiles['partiallytrapped'];
			},
			onTryHitPriority: -1,
			onTryHit(target, source, move) {
				if (target === source) {
					this.debug('sub bypass: self hit');
					return;
				}
				if (move.drain) {
					this.add('-miss', source);
					return null;
				}
				if (move.category === 'Status') {
					const SubBlocked = ['leechseed', 'lockon', 'mindreader', 'nightmare'];
					if (move.status || move.boosts || move.volatileStatus === 'confusion' || SubBlocked.includes(move.id)) {
						this.add('-activate', target, 'Substitute', '[block] ' + move.name);
						return null;
					}
					return;
				}
				if (move.volatileStatus && target === source) return;
				let damage = this.getDamage(source, target, move);
				if (!damage) return null;
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) return damage;
				target.volatiles['substitute'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['substitute'].hp <= 0) {
					this.debug('Substitute broke');
					target.removeVolatile('substitute');
					target.subFainted = true;
				} else {
					this.add('-activate', target, 'Substitute', '[damage]');
				}
				// Drain/recoil does not happen if the substitute breaks
				if (target.volatiles['substitute']) {
					if (move.recoil) {
						this.damage(Math.round(damage * move.recoil[0] / move.recoil[1]), source, target, 'recoil');
					}
				}
				this.runEvent('AfterSubDamage', target, source, move, damage);
				// Add here counter damage
				const lastAttackedBy = target.getLastAttackedBy();
				if (!lastAttackedBy) {
					target.attackedBy.push({source: source, move: move.id, damage: damage, thisTurn: true});
				} else {
					lastAttackedBy.move = move.id;
					lastAttackedBy.damage = damage;
				}
				return 0;
			},
			onEnd(target) {
				this.add('-end', target, 'Substitute');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	wrap: {
		inherit: true,
		// FIXME: onBeforeMove() {},
	},
};

exports.BattleMovedex = BattleMovedex;
