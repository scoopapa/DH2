export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// Shadow Moves
	shadowrush: {
		accuracy: true,
		basePower: 50,
		category: "Physical",
		shortDesc: "This move does not check accuracy.",
		name: "Shadow Rush",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Tackle", target);
		},
		/* onBasePower(basePower, source, target, move) {
			if (target.volatiles['shadow']) {
				return this.chainModify(0.5);
			} else {
				return this.chainModify(2);
			}
		},
		onEffectiveness(typeMod, target, type) {
			if (target.volatiles['shadow']) {
				return 2;
			} else {
				return 1;
			}
		}, */
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowblitz: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Usually moves first. Has 50% recoil.",
		name: "Shadow Blitz",
		pp: 5,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Quick Attack", target);
		},
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowwave: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "Lowers the foe(s)'s Evasion by 1 stage.",
		name: "Shadow Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Signal Beam", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				evasion: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowbreak: {
		accuracy: 90,
		basePower: 70,
		category: "Physical",
		shortDesc: "-6 priority.",
		name: "Shadow Break",
		pp: 10,
		priority: -6,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Brick Break", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowrave: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "10% chance to lower the foe(s)'s SpD by 1 stage.",
		name: "Shadow Rave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Dark Pulse", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowsky: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Summons Shadow Sky for 5 turns.",
		name: "Shadow Sky",
		pp: 5,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Dragon Dance", target);
		},
		weather: 'Shadow Sky',
		secondary: null,
		target: "all",
		type: "Shadow",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	shadowend: {
		accuracy: 100,
		basePower: 105,
		category: "Physical",
		shortDesc: "Lowers the user's Attack and Defense by 1 stage.",
		name: "Shadow End",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Double-Edge", target);
		},
		self: {
			boosts: {
				atk: -1,
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowstorm: {
		accuracy: 80,
		basePower: 90,
		category: "Special",
		shortDesc: "20% chance to lower the foe(s)'s Evasion by 1 stage. Can't miss in Shadow Sky.",
		name: "Shadow Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Bleakwind Storm", target);
		},
		onModifyMove(move, pokemon, target) {
			if (target && ['shadowsky'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
		},
		secondary: {
			chance: 20,
			boosts: {
				evasion: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowpanic: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heal 33% max HP and protects the user, then gets disabled.",
		name: "Shadow Panic",
		pp: 5,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'shadowpanic',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			this.add('-anim', pokemon, "Hex", pokemon);
			pokemon.addVolatile('stall');
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			pokemon.addVolatile('disable');
		},
		heal: [1, 3],
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "self",
		type: "Shadow",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	shadowmist: {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "Resets the foe's positive stat changes. Always crits and hits adjacent foes in Shadow Sky.",
		name: "Shadow Mist",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Clear Smog", target);
		},
		onHit(target) {
			target.clearBoosts(); // change to just positive boosts later
			this.add('-clearboost', target);
		},
		onModifyMove(move, pokemon, target) {
			if (target && ['shadowsky'].includes(target.effectiveWeather())) {
				move.willCrit = true;
				move.target = 'allAdjacentFoes';
			}
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowdown: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Lower's the foe(s) Defense by 1 stage. Usually moves first.",
		name: "Shadow Down",
		pp: 30,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Mean Look", target);
		},
		boosts: {
			def: -1,
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	},
	shadowhold: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Traps the foe and disables their item.",
		name: "Shadow Hold",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Anchor Shot", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
				target.addVolatile('embargo');
			},
		},
		target: "normal",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowshed: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Boosts the user's Atk, SpA, and Spe by 1 stage. User stops being a Shadow Pokemon.",
		name: "Shadow Shed",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Refresh", target);
		},
		onHit(pokemon) {
			pokemon.removeVolatile('shadow');
		},
		boosts: {
			atk: 1,
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Shadow",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	shadowhalf: {
		accuracy: true,
		basePower: 0,
		damageCallback(pokemon, target) {
			if (target.volatiles['shadow']) return;
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
		category: "Special",
		shortDesc: "All Pokemon on the field lose 50% of their current HP.",
		isViable: true,
		name: "Shadow Half",
		pp: 5,
		priority: 0,
		flags: {bypasssub: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			/* if (!source.volatiles['shadow']) {
				this.actions.useMove("Shadow Half Self", source);
			} */
			this.add('-anim', source, "Haze", source);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			this.effectState.shadowHalf = false;
		},
		self: {
			onHit(pokemon, source, move) {
				if (this.effectState.shadowHalf) return;
				if (!source.volatiles['shadow']) {
					this.damage(source.getUndynamaxedHP() / 2, pokemon, source);
					this.effectState.shadowHalf = true;
				}
			},
		},
		secondary: null,
		target: "allAdjacent",
		type: "Shadow",
		zMove: {effect: 'heal'},
		contestType: "Beautiful",
	},
	/* shadowhalfself: {
		accuracy: true,
		basePower: 0,
		damageCallback(pokemon, target) {
			if (target.volatiles['shadow']) return;
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
		category: "Special",
		shortDesc: "All Pokemon on the field lose 50% of their current HP.",
		isViable: true,
		name: "Shadow Half Self",
		pp: 5,
		priority: 0,
		flags: {bypasssub: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Haze", source);
		},
		secondary: null,
		target: "self",
		type: "Shadow",
		zMove: {effect: 'heal'},
		contestType: "Beautiful",
	}, */
	shadowsights: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User or ally's attacks ignore abilities and immunities.",
		name: "Shadow Sights",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'shadowsights',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Laser Focus", target);
		},
		condition: {
			onStart(target, source, effect) {
				this.add('-start', target, 'move: Shadow Sights');
				this.add('-message', `${target.name} is hyperfocusing on the foe's shadows!`);
			},			
			onModifyMovePriority: -5,
			onModifyMove(move) {
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity = true;
				}
				move.ignoreAbility = true;
			},
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Shadow",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	shadowbolt: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		shortDesc: "20% chance to paralyze the foe. Applies the Embargo effect for 5 turns.",
		name: "Shadow Bolt",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'embargo',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Wildbolt Storm", target);
		},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowchill: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		shortDesc: "Deals 1.5x damage to Water-types.",
		name: "Shadow Chill",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Glacial Lance", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (target.hasType('Water')) {
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowfire: {
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'brn') return move.basePower * 1.5;
			return move.basePower;
		},
		category: "Special",
		shortDesc: "50% brn. 1.5x pwr to brn foes. 30% bypass protect in Sun.",
		name: "Shadow Fire",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Magma Storm", target);
		},
		onModifyMove(move, pokemon, target) {
			if (target && ['sunnyday', 'desolateland'].includes(target.effectiveWeather()) &&
				this.randomChance(30, 100)) {
				delete move.flags['protect'];
			}
		},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
	},
	// Old Moves
	perishsong: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			let immuneMon = false;
			for (const mon of attacker.side.active) {
				if (this.runEvent('Immunity', mon, attacker, move)) {
					immuneMon = true;
				}
			}
			for (const mon of attacker.side.foe.active) {
				if (this.runEvent('Immunity', mon, attacker, move)) {
					immuneMon = true;
				}
			}
			if (immuneMon) return;
			if (this.format.gameType === 'singles') {
				if (attacker.side.pokemonLeft === 1 && attacker.side.foe.pokemonLeft === 1) {
					return false;
				}
			} else if (this.format.gameType === 'doubles') {
				if (attacker.side.pokemonLeft === 2 && attacker.side.foe.pokemonLeft === 2) {
					return false;
				}
			}
		},
	},
	embargo: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (effect?.name === "Shadow Hold") {
					return 0;
				}
				return 5;
			},
			onStart(pokemon) {
				this.add('-start', pokemon, 'Embargo');
				this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onResidualOrder: 21,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Embargo');
			},
		},
	},
	weatherball: {
		inherit: true,
		onModifyMove(move) {
			switch (this.field.effectiveWeather()) {
			case 'sunnyday':
				move.type = 'Fire';
				move.category = 'Special';
				break;
			case 'raindance':
				move.type = 'Water';
				move.category = 'Special';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
				move.type = 'Ice';
				move.category = 'Special';
				break;
			case 'shadowsky':
				move.type = 'Shadow';
				break;
			}
			if (this.field.effectiveWeather()) move.basePower *= 2;
		},
		/* onEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Shadow') {
				if (target.volatiles['shadow']) {
					return 2;
				} else {
					return 1;
				}
			}
		}, */
	},
};
