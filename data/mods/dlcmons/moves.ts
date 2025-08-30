export const Moves: {[moveid: string]: ModdedMoveData} = {
	vocalstrain: {
		num: -1,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Vocal Strain",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Voice", target);
		},
		onHit(target, source) {
			source.addVolatile('vocalstrain');
		},
		condition: {
			duration: 2,
			onTryHit(target, source, move) {
				if (move.flags['sound']) return null;
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		shortDesc: "Hits all adjacent foes. Prevents the user from using sound-based moves for 2 turns.",
	},
	abadapple: {
		num: -2,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "A Bad Apple",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grav Apple", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fairy') return 1;
		},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
		desc: "Has a 20% chance to poison the target. This move's type effectiveness against Fairy is changed to be super effective no matter what this move's type is.",
		shortDesc: "20% chance to poison. Super effective on Fairy.",
	},
	kindle: {
		num: -3,
		accuracy: 100,
		basePower: 55,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno", target);
		},
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'brn') return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Kindle",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		desc: "Power doubles if the target suffers from Burn.",
		shortDesc: "Power doubles if the target is burnt.",
	},
	cleansingwave: {
		num: -4,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Cleansing Wave",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wave Crash", target);
		},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Cleansing Wave', '[of] ' + pokemon);
				}
				if (target.hp && target.removeVolatile('leechseed')) {
					this.add('-end', target, 'Leech Seed', '[from] move: Cleansing Wave', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Cleansing Wave', '[of] ' + pokemon);
					}
					if (target.hp && target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Cleansing Wave', '[of] ' + pokemon);
					}
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Cleansing Wave', '[of] ' + pokemon);
				}
				if (target.hp && target.removeVolatile('leechseed')) {
					this.add('-end', target, 'Leech Seed', '[from] move: Cleansing Wave', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Cleansing Wave', '[of] ' + pokemon);
					}
					if (target.hp && target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Cleansing Wave', '[of] ' + pokemon);
					}
				}
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Cool",
		desc: "Removes Leech Seed and entry hazards of both side, and decreases the targets' Speed by 1 stage. Hit all adjacent foes.",
		shortDesc: "Removes hazards and Leech Seed from both sides. Decreases the targets' Speed by 1 stage. Hit all adjacent foes.",
	},
	mantisfist: {
		num: -5,
		accuracy: true,
		basePower: 40,
		category: "Physical",
		name: "Mantis Fist",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, punch: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Bug",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "X-Scissor", target);
		},
		zMove: {basePower: 140},
		maxMove: {basePower: 120},
		contestType: "Cool",
		shortDesc: "Hit twice in one turn. Bypass accuracy check. Fist-based and contact-based, but ignores contact-delibtating mechanics like Iron Barbs.",
	},
	magmachamber: {
		num: -6,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Magma Chamber",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onHit(target) {
			if (!target.hasType('Fire')) return;
			target.setType(target.getTypes(true).map(type => type === "Fire" ? "???" : type));
			this.add('-start', target, 'typechange', target.getTypes().join('/'), '[from] move: Magma Chamber');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magma Storm", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Clever",
		shortDesc: "Removes the target's Fire-type on hit.",
	},
	jumpscare: {
		num: -7,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Jumpscare",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Jumpscare only works on your first turn out.");
				return false;
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scary Face", target);
			this.add('-anim', source, "Crunch", target);
			this.add('-anim', source, "Flash", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Cute",
		desc: "Has a 100% chance to make the target flinch. Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
	},
	meltdown: {
		num: -8,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Meltdown",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		recoil: [1, 4],
		onModifyMove(move, pokemon, target) {
			if (pokemon.status && pokemon.status === 'brn') {
				move.secondaries.push({
					chance: 100,
					status: 'brn',
				});
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash Cannon", target);
			this.add('-anim', source, "Flame Burst", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP. If the user is Burnt, attempts to Burn the target.",
		shortDesc: "Has 1/4 recoil. If the user is Burnt, attempts to Burn the target.",
	},
	shocktail: {
		num: -9,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Shock Tail",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			let hasBoost = false;
			let i: BoostID;
			if (!target) return;
			for (i in target.boosts) {
				if (target.boosts[i] >= 0) hasBoost = true;
			}
			if (hasBoost) {
				move.secondaries.push({
					chance: 100,
					status: 'par',
				});
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Tail", target);
			this.add('-anim', source, "Spark", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
		shortDesc: "Guaranteed Paralysis on a target with at least one increased stat stage.",
	},
	mindgamepunch: {
		num: -10,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Mind-Game Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		onTryHit(target, source) {
			const targetAbility = target.getAbility();
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['failskillswap'] || targetAbility.flags['failskillswap'] || target.volatiles['dynamax'] || source.volatiles['mindgame']) {
				return false;
			}
			const sourceCanBeSet = this.runEvent('SetAbility', source, source, this.effect, targetAbility);
			if (!sourceCanBeSet) return sourceCanBeSet;
			const targetCanBeSet = this.runEvent('SetAbility', target, source, this.effect, sourceAbility);
			if (!targetCanBeSet) return targetCanBeSet;
		},
		onHit(target, source, move) {
			const targetAbility = target.getAbility();
			const sourceAbility = source.getAbility();
			if (target.isAlly(source)) {
				this.add('-activate', source, 'move: Skill Swap', '', '', '[of] ' + target);
			} else {
				this.add('-activate', source, 'move: Skill Swap', targetAbility, sourceAbility, '[of] ' + target);
			}
			this.singleEvent('End', sourceAbility, source.abilityState, source);
			this.singleEvent('End', targetAbility, target.abilityState, target);
			source.ability = targetAbility.id;
			target.ability = sourceAbility.id;
			source.abilityState = {id: this.toID(source.ability), target: source};
			target.abilityState = {id: this.toID(target.ability), target: target};
			source.volatileStaleness = undefined;
			if (!target.isAlly(source)) target.volatileStaleness = 'external';
			this.singleEvent('Start', targetAbility, source.abilityState, source);
			this.singleEvent('Start', sourceAbility, target.abilityState, target);
			source.addVolatile('mindgame');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power-Up Punch", target);
			this.add('-anim', source, "Skill Swap", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
		desc: "Once per switch-out, swaps the user’s Ability with the target’s own on a successful hit. The move still damages the target if either the user or the target have an unswappable Ability (i.e. Multitype), but will not swap the Abilities. If no damage is dealt (i.e. immunity), then neither the user or target’s Ability will be swapped. Fist-based; boosted by Iron Fist.",
		shortDesc: "Once per switch-out, swaps the user’s Ability with the target’s own on a successful hit.",
	},
	petrify: {
		num: -11,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Petrify",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryHit(target, source, move) {
			if (target.hasType('Rock')) return false;
			return true;
		},
		onHit(target) {
			if (target.hasType('Rock')) return false;
			if (!target.addType('Rock')) return false;
			this.add('-start', target, 'typeadd', 'Rock', '[from] move: Petrify');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
		shortDesc: "Turn the target’s type into Rock (akin to Soak). No damage nor effect if the target already has the Rock-type.",
	},


	// Swift Retreat
	bounce: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
                if (attacker.hasAbility('swiftretreat')) {
                    attacker.switchFlag = true;
                    return null;
                }
                return;
            }
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	dig: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
                if (attacker.hasAbility('swiftretreat')) {
                    attacker.switchFlag = true;
                    return null;
                }
                return;
            }
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	dive: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
                if (attacker.hasAbility('swiftretreat')) {
                    attacker.switchFlag = true;
                    return null;
                }
                return;
            }
			if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	fly: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
                if (attacker.hasAbility('swiftretreat')) {
                    attacker.switchFlag = true;
                    return null;
                }
                return;
            }
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	phantomforce: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
                if (attacker.hasAbility('swiftretreat')) {
                    attacker.switchFlag = true;
                    return null;
                }
                return;
            }
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	shadowforce: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
                if (attacker.hasAbility('swiftretreat')) {
                    attacker.switchFlag = true;
                    return null;
                }
                return;
            }
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
};
